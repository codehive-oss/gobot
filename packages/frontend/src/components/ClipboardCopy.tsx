import { ClipboardIcon } from "@heroicons/react/outline";

interface ClipboardCopyProps {
  textToCopy: string;
}

const ClipboardCopy: React.FC<ClipboardCopyProps> = ({
  children,
  textToCopy,
}) => {
  return (
    <span
      onClick={() => {
        navigator.clipboard.writeText(textToCopy);
      }}
      className="inline-flex text-gray-400 hover:text-white bg-transparent hover:bg-gray-800 cursor-pointer transition-colors ease-in px-3 py-1"
    >
      <ClipboardIcon className="w-6 h-6" />
      {children}
    </span>
  );
};

export default ClipboardCopy;
