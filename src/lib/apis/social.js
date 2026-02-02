import apiClient from "~/utils/axios";

const BASE_URL = "/api/social";

const transformData = (data) => {
  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "";
  };

  const captionText = data.caption.replace(/#[^\s]+/g, "").trim();
  const caption = truncateText(captionText, 100);
  const hashtags = data.hashtag
    .split(" ")
    .slice(0, 5)
    .map((tag) => `#${tag}`)
    .join(" ");

  return {
    caption,
    hashtag: hashtags,
    likeN: data.likeN,
    commentN: data.commentN,
    pubDate: data.pubDate,
    channel: data.channel,
    thumbnail_url: data.thumbnail_url,
    url: data.url,
  };
};

export const getInstagramSocialTrend = async function getInstagramSocialInfo(
  keyword
) {
  try {
    const { data } = await apiClient.get(`${BASE_URL}/instagram`, {
      params: { word: keyword },
    });
    console.log("data:", data);
    return {
      trendData: data.trendData,
      topTags: data.topTags,
      tagInfo: data.tagInfo,
    };
  } catch (error) {
    console.error("Error fetching Instagram social trend:", error);
  }
};

export const getInstagramPosts = async (keyword) => {
  try {
    const result = await apiClient.get("/api/news/instagram", {
      params: {
        keyword: keyword,
      },
    });
    console.log("result:", result.data);
    console.log(
      "after:",
      result.data.map((post) => {
        return transformData(post);
      })
    );
    return result.data.map((post) => {
      return transformData(post);
    });
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    return [];
  }
};
