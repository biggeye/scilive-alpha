const title = 'Dashboard';

export const metadata = {
  title,
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
};

export default function Layout({
  children,
  create,
  social,
}: {
  children: React.ReactNode;
  create: React.ReactNode;
  social: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        {children}

        <div className="space-y-6">
          {create}
          {social}
        </div>
      </div>
    </div>
  );
}