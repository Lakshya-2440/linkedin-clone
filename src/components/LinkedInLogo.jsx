function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

const SIZE_MAP = {
  sm: {
    word: "text-[26px]",
    tile: "h-8 w-8 rounded-[5px] text-[18px]",
  },
  md: {
    word: "text-[34px]",
    tile: "h-10 w-10 rounded-[6px] text-[22px]",
  },
};

export default function LinkedInLogo({
  size = "sm",
  showWordmark = true,
  className = "",
}) {
  const tokens = SIZE_MAP[size] || SIZE_MAP.sm;

  return (
    <div className={cx("inline-flex items-center gap-1 leading-none", className)}>
      {showWordmark && (
        <span
          className={cx(
            "font-semibold tracking-tight text-[#0a66c2]",
            tokens.word
          )}
        >
          Linked
        </span>
      )}
      <span
        aria-label="LinkedIn"
        className={cx(
          "inline-flex items-center justify-center bg-[#0a66c2] font-bold text-white",
          tokens.tile
        )}
      >
        in
      </span>
    </div>
  );
}
