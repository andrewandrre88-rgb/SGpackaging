interface PageHeaderProps {
  title: string;
  description?: string;
  image?: string; // Kept for interface compatibility
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-slate-50 py-10 sm:py-14 lg:py-16 2xl:py-20 px-4 sm:px-6 lg:px-10 2xl:px-12 border-b border-slate-100">
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto flex flex-col items-start">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-3 sm:mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-base sm:text-lg lg:text-xl text-slate-500 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
