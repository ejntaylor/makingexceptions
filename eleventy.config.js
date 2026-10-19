module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("robots.txt");

    eleventyConfig.ignores.add("node_modules/");
    eleventyConfig.ignores.add("README.md");

    eleventyConfig.addCollection("episodes", function (collectionApi) {
        return collectionApi
            .getFilteredByGlob("episodes/*.md")
            .sort((a, b) => b.data.episodeNumber - a.data.episodeNumber);
    });

    eleventyConfig.addFilter("dateFormat", function (date) {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    });

    eleventyConfig.addFilter("isoDate", function (date) {
        return new Date(date).toISOString().split("T")[0];
    });

    eleventyConfig.addFilter("isoDateTime", function (date) {
        return new Date(date).toISOString();
    });

    eleventyConfig.addFilter("year", function (date) {
        return (date ? new Date(date) : new Date()).getFullYear();
    });

    eleventyConfig.addFilter("duration", function (seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${mins}:${secs.toString().padStart(2, "0")}`;
    });

    eleventyConfig.addFilter("limit", function (arr, limit) {
        return arr.slice(0, limit);
    });

    eleventyConfig.addFilter("excerpt", function (content) {
        if (!content) {
            return "";
        }

        const stripped = content.replace(/<[^>]+>/g, "");
        const firstParagraph = stripped.split("\n").find((p) => p.trim().length > 0);

        if (!firstParagraph) {
            return "";
        }

        return firstParagraph.length > 200
            ? firstParagraph.substring(0, 200) + "..."
            : firstParagraph;
    });

    eleventyConfig.addFilter("pad", function (number) {
        return String(number).padStart(2, "0");
    });

    eleventyConfig.addFilter("episodeSlug", function (number) {
        return `ep-${number}`;
    });

    return {
        dir: {
            input: ".",
            output: "_site",
            includes: "_includes",
            data: "_data",
        },
        templateFormats: ["html", "njk", "md"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    };
};
