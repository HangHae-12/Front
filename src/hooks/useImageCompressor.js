import imageCompression from "browser-image-compression";

export async function compressImage(file) {
  const options = {
    maxSizeMB: 0.5, // 결과 이미지의 최대 파일 크기 (MB)
    maxWidthOrHeight: 200, // 결과 이미지의 최대 너비 또는 높이 (px)
    useWebWorker: true, // Web Worker를 사용하여 압축을 수행할지 여부
  };

  try {
    const compressedFile = await imageCompression(file, options);
    
    // 압축 후의 이미지 크기가 더 작은 경우에만 압축된 이미지를 사용하도록 함
    if (compressedFile.size < file.size) {
      return compressedFile;
    } else {
      return file;
    }
  } catch (error) {
    console.error("이미지 압축 오류:", error);
    return file;
  }
}
