import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: Parameters<NonNullable<CldUploadWidgetProps["onSuccess"]>>[0]) => {
      if (
        result.info &&
        typeof result.info !== "string" &&
        "secure_url" in result.info
      ) {
        onChange(result.info.secure_url);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="cloudName"
      options={{ maxFiles: 1 }}
    >
      {(widget) => {
        const open = widget?.open;
        return (
          <div
            onClick={() => open?.()}
            className="
          relative
          cursor-pointer
          hover:opacity-70
          transition
          border-dashed
          border-2
          p-20
          border-neutral-300
          flex
          flex-col
          justify-center
          items-center
          gap-4
          text-neutral-600
        "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">
              Clique para adicionar uma imagem
            </div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
