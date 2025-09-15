class CreateBlog {
  constructor(blogData, user_id) {
    this.title = blogData?.title?.trim() || "";
    this.preview = blogData?.preview?.trim() || "";
    this.image_url = ""; // TODO: pass AWS S3 link for images
    this.content = blogData?.content || "";
    this.author_details = {
      name: blogData?.author_details?.name?.trim() || "",
      user_id: user_id,
    };
    this.status = ["draft", "published"].includes(blogData?.status)
      ? blogData.status
      : "draft";
    this.published_date = this.status === "published" ? Date.now() : null;
    this.category = [
      "match_report",
      "transfer_news",
      "transfer_analysis",
      "injury_updates",
      "tactical_analysis",
      "press_conference",
      "club_update",
      "player_feature",
      "manager_feature",
      "leagues",
      "team_news",
      "prediction",
      "preview",
      "opinion",
      "stat_watch",
      "fan_reaction",
      "breaking_news",
      "record_watch",
      "listicle",
    ].includes(blogData?.category)
      ? blogData.category
      : "team_news";
    this.teams = Array.isArray(blogData?.teams) ? blogData.teams : [];
    this.leagues = Array.isArray(blogData?.leagues) ? blogData.leagues : [];
    this.tags = Array.isArray(blogData?.tags) ? blogData.tags : [];
    this.sources = Array.isArray(blogData?.sources) ? blogData.sources : [];
  }
}

module.exports = { CreateBlog };
