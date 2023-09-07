import AuthorizationProvider from "@/components/providers/AuthorizationProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthorizationProvider>{children}</AuthorizationProvider>;
}
