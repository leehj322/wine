export default function timeAgo(dateString: string | undefined): string {
  if (!dateString) {
    return "알 수 없음";
  }

  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const units = [
    { name: "년", seconds: 60 * 60 * 24 * 365 },
    { name: "개월", seconds: 60 * 60 * 24 * 30 },
    { name: "일", seconds: 60 * 60 * 24 },
    { name: "시간", seconds: 60 * 60 },
    { name: "분", seconds: 60 },
    { name: "초", seconds: 1 },
  ];

  const foundUnit = units.find((unit) => {
    const value = Math.floor(diffInSeconds / unit.seconds);
    return value > 0;
  });

  if (foundUnit) {
    const value = Math.floor(diffInSeconds / foundUnit.seconds);
    return `${value}${foundUnit.name} 전`;
  }

  return "방금 전";
}
