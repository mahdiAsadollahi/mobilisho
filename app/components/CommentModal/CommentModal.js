// app/components/CommentModal/CommentModal.js
import { FiX, FiUser, FiMail } from "react-icons/fi";

export default function CommentModal({
  isOpen,
  onClose,
  onSave,
  comment,
  loading,
}) {
  if (!isOpen) return null;

  const [content, setContent] = React.useState(comment?.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(content);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">ویرایش نظر</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
            {comment && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiUser className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {comment.user.name}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FiMail size={12} />
                      <span>{comment.user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">نظر اصلی:</div>
                <p className="text-gray-700 bg-white p-3 rounded border">
                  {comment.content}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                متن نظر ویرایش شده
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="متن نظر را ویرایش کنید..."
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={loading}
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
