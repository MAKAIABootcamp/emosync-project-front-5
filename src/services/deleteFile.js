
export const deleteFile = async (imageUrl) => {
  const cloudName = "dd3qzm4in";
  const publicId = imageUrl.substring(imageUrl.lastIndexOf("/") + 1, imageUrl.lastIndexOf("."));

  const urlCloudinary = `https://api.cloudinary.com/v1_1/${cloudName}/delete/${publicId}`;

  try {
    const resp = await fetch(urlCloudinary, {
      method: "delete",
    });

    if (!resp.ok) {
      console.log("Error al eliminar la imagen.");
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};