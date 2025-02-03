import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useImageGallery } from "~/lib/hooks/useImageGallery";

interface ProjectGalleryProps {
  title: string | null;
  galleryImages: Array<{ url: string }>;
  thumbnail: string | null;
}

export function ProjectGallery({
  title,
  galleryImages,
  thumbnail,
}: ProjectGalleryProps) {
  const {
    modalOpen,
    setModalOpen,
    currentImageIndex,
    setCurrentImageIndex,
    handleNextImage,
    handlePrevImage,
    currentImage,
  } = useImageGallery({
    images: galleryImages,
    thumbnail,
  });

  if (galleryImages.length === 0 && !thumbnail) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
        {/* Main Image - either first gallery image or thumbnail */}
        <div
          className="relative col-span-1 aspect-video cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-95 sm:col-span-2"
          onClick={() => {
            setCurrentImageIndex(0);
            setModalOpen(true);
          }}
        >
          <Image
            src={galleryImages[0]?.url ?? thumbnail ?? ""}
            alt={`${title} - Main Image`}
            fill
            className="object-cover"
          />
        </div>

        {/* Additional Gallery Images */}
        {galleryImages.slice(1, 2).map((image, index) => (
          <div
            key={index}
            className="relative aspect-video cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-95"
            onClick={() => {
              setCurrentImageIndex(index + 1);
              setModalOpen(true);
            }}
          >
            <Image
              src={image.url}
              alt={`${title} - Gallery Image ${index + 2}`}
              fill
              className="object-cover"
            />
          </div>
        ))}

        {/* Show remaining count if there are more images */}
        {galleryImages.length > 2 && galleryImages[2] && (
          <div
            className="relative aspect-video cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-95"
            onClick={() => {
              setCurrentImageIndex(2);
              setModalOpen(true);
            }}
          >
            <Image
              src={galleryImages[2].url}
              alt={`${title} - Gallery Image 3`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-lg font-medium text-white">
                +{galleryImages.length - 2} more
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-hidden border-none bg-transparent p-0">
          <DialogTitle className="sr-only">
            {title} - Image Gallery
          </DialogTitle>
          <div className="relative h-full min-h-[80vh] w-full rounded-lg bg-black/90">
            {/* Navigation buttons */}
            {galleryImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 z-50 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 z-50 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Current image */}
            <div className="relative flex h-full w-full items-center justify-center p-4">
              <div className="relative h-full w-full">
                <Image
                  src={currentImage}
                  alt={`${title} - Gallery Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {currentImageIndex + 1} /{" "}
              {galleryImages.length || (thumbnail ? 1 : 0)}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 