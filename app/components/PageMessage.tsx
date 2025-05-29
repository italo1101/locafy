"use client";

interface PageMessageProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const PageMessage: React.FC<PageMessageProps> = ({ title, subtitle, children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-6">{subtitle}</p>
      {children}
    </div>
  );
};

export default PageMessage;
