import { useState, useCallback, useEffect } from "react";

interface UseImageGalleryProps {
  images: { url: string }[];
  thumbnail?: string | null;
}

export function useImageGallery({ images, thumbnail }: UseImageGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const totalImages = images.length;
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    },
    [images],
  );

  const handlePrevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const totalImages = images.length;
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    },
    [images],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    },
    [modalOpen, handleNextImage, handlePrevImage],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset image index when images change
  useEffect(() => {
    setCurrentImageIndex(0);
    setModalOpen(false);
  }, [images]);

  const currentImage = images[currentImageIndex]?.url ?? thumbnail ?? "";

  return {
    modalOpen,
    setModalOpen,
    currentImageIndex,
    setCurrentImageIndex,
    handleNextImage,
    handlePrevImage,
    currentImage,
  };
} 