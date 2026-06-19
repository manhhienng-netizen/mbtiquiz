export interface SpiritualLoadingProps {
  name: string
}

export default function SpiritualLoading({ name }: SpiritualLoadingProps) {
  const displayName = name.trim() || 'bạn'

  return (
    <div className="w-full max-w-lg mx-auto text-center py-12 px-4">
      <div
        className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-[rgba(168,230,61,0.2)] border-t-[#A8E63D] animate-spin"
        role="status"
        aria-label="Đang tải"
      />
      <p className="text-lg font-medium text-white">
        Đang phân tích năng lượng của{' '}
        <span className="text-[#A8E63D]">{displayName}</span>
        ...
      </p>
      <p className="mt-2 text-sm text-[rgba(255,255,255,0.50)]">
        Can Chi · Nhật chủ · Thần số học
      </p>
    </div>
  )
}
