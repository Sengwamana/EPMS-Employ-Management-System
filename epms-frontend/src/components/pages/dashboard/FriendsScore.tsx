import Card from "../../ui/Card";

const friends = [
  {
    id: 1,
    name: "Anna Morgan",
    score: "10,568",
    avatarBg: "bg-gradient-to-br from-orange-400 to-red-500",
    initial: "A",
    badges: [
      { icon: "🏅", count: 23 },
      { icon: "⭐", count: 832 },
      { icon: "💎", count: 48 },
    ],
  },
  {
    id: 2,
    name: "Jake Thompson",
    score: "10,234",
    avatarBg: "bg-gradient-to-br from-gray-700 to-black",
    initial: "J",
    badges: [
      { icon: "🏅", count: 21 },
      { icon: "⭐", count: 779 },
      { icon: "💎", count: 36 },
    ],
  },
  {
    id: 3,
    name: "Sofia Bennett",
    score: "9,892",
    avatarBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
    initial: "S",
    badges: [
      { icon: "🏅", count: 19 },
      { icon: "⭐", count: 742 },
      { icon: "💎", count: 33 },
    ],
  },
  {
    id: 4,
    name: "Emily Carter",
    score: "9,322",
    avatarBg: "bg-gradient-to-br from-orange-300 to-amber-400",
    initial: "E",
    badges: [
      { icon: "🏅", count: 17 },
      { icon: "⭐", count: 641 },
      { icon: "💎", count: 28 },
    ],
  },
];

const FriendsScore = () => {
  return (
    <Card className="flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            Friends Score
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">
            See how you rank among friends
          </p>
        </div>
        <button className="bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-xl border border-gray-200/60 hover:bg-gray-100 transition-all">
          All
        </button>
      </div>

      {/* Friends List */}
      <div className="space-y-1">
        {friends.map((friend, idx) => (
          <div
            key={friend.id}
            className={`flex items-center gap-3 py-3 ${
              idx !== friends.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-full ${friend.avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0 ring-2 ring-white`}
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            >
              {friend.initial}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {friend.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                {friend.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-gray-400 flex items-center gap-0.5"
                  >
                    {badge.icon} {badge.count}
                  </span>
                ))}
              </div>
            </div>

            {/* Score */}
            <span className="text-lg font-bold text-gray-900 shrink-0 tabular-nums">
              {friend.score}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FriendsScore;
