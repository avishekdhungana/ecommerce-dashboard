interface RatingProps {
  rate: number;
  count?: number;
}

export function Rating({ rate, count }: RatingProps) {
  const filled = Math.round(rate);

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rated ${rate} out of 5`}
    >
      <div className="flex text-yellow-500" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>{star <= filled ? "★" : "☆"}</span>
        ))}
      </div>
      <span className="text-sm text-gray-600">{rate}</span>
      {count !== undefined && (
        <span className="text-sm text-gray-400">({count})</span>
      )}
    </div>
  );
}