export default function DashboardLayout(props: {
  children: React.ReactNode,
  social: React.ReactNode,
  chat: React.ReactNode,
}) {
  return (
    <div>
              {props.children}
      </div>
   )
}
