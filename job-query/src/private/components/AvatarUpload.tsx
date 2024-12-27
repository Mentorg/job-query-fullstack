// import { useRef } from "react";
// import Button from "../../shared/components/ui/Button";
// import { Recruiter, User } from "../../shared/types/user";
// import { Company } from "../../shared/types/company";

// type ResourceData = User | Recruiter | Company;

// type AvatarUploadProps = {
//   onFileSelect: (file: File) => void;
// };

// function AvatarUpload({ onFileSelect }: AvatarUploadProps) {
//   const inputRef = useRef<HTMLInputElement>(null);

//   function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (file) {
//       onFileSelect(file);
//     }
//   }

//   function handleDrop(e: React.DragEvent<HTMLDivElement>) {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       onFileSelect(file);
//     }
//   }

//   function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
//     e.preventDefault();
//   }

//   function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
//     e.preventDefault();
//     if (inputRef.current) {
//       inputRef.current.click(); // Trigger click on file input
//     }
//   }

//   return (
//     <div
//       onDrop={handleDrop}
//       onDragOver={handleDragOver}
//       className="flex h-full w-fit flex-col justify-center transition-all lg:items-center lg:border-4 lg:border-dotted lg:border-primary lg:py-2"
//     >
//       <p className="ml-4 hidden text-slate-500 lg:flex">
//         Drag and drop your image here or Click the Browse button below
//       </p>
//       <Button
//         onClick={handleButtonClick}
//         className="mt-4 rounded-md bg-primary px-3 py-1 text-white transition-all hover:bg-opacity-75"
//       >
//         Upload
//       </Button>
//       <input
//         type="file"
//         accept="image/png, image/jpg, image/svg+xml"
//         onChange={handleFileInputChange}
//         ref={inputRef}
//         style={{ display: "none" }}
//       />
//     </div>
//   );
// }

// export default AvatarUpload;
