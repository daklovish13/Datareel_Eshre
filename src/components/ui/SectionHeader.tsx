export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full p-10 md:p-14">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
