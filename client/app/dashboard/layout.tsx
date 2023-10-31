import AuthorizationProvider from "@/components/providers/AuthorizationProvider";
import { SocketProvider } from "@/components/providers/SocketProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthorizationProvider>
      <SocketProvider>{children}</SocketProvider>
    </AuthorizationProvider>
  );
}
