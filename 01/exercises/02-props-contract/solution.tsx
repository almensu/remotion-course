import {AbsoluteFill} from "remotion";

type MetricCardProps = {label: string; value: string; accentColor: string};
const MetricCard = ({label, value, accentColor}: MetricCardProps) => <article style={{flex: 1, padding: 36, borderRadius: 28, backgroundColor: "#111827", borderTop: `5px solid ${accentColor}`}}><div style={{fontSize: 26, color: "#8e99b3"}}>{label}</div><div style={{fontSize: 70, fontWeight: 750, marginTop: 18}}>{value}</div></article>;
const metrics = [{id: "views", label: "Views", value: "2.4M", accentColor: "#5eead4"}, {id: "likes", label: "Likes", value: "186K", accentColor: "#a78bfa"}, {id: "shares", label: "Shares", value: "32K", accentColor: "#fb923c"}];

export const PropsContract = () => <AbsoluteFill style={{backgroundColor: "#070b14", color: "#e8ecf6", padding: 96, justifyContent: "center"}}><div style={{display: "flex", gap: 24}}>{metrics.map(({id, ...metric}) => <MetricCard key={id} {...metric} />)}</div></AbsoluteFill>;
