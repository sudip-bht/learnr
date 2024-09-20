// Function to get all videos
export async function getVideos(req, res, next) {
  try {
    const videos = await Video.find();
    return res.status(200).send({
      message: "Videos retrieved successfully!",
      data: videos,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: e,
    });
  }
}
