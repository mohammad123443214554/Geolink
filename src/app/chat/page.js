'use client'

export default function ChatPage() {
  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-80px)]">
      <div className="grid grid-cols-3 h-full border-t border-gray-200 dark:border-gray-800">
        <div className="border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <input type="text" placeholder="Search chats..." className="input-field" />
          </div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
              <div className="flex items-center space-x-3">
                <img src="/images/default-avatar.png" className="w-12 h-12 rounded-full" alt="User" />
                <div className="flex-1">
                  <h3 className="font-medium">User {i + 1}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last message...</p>
                </div>
                <span className="text-xs text-gray-500">2h</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-span-2 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <img src="/images/default-avatar.png" className="w-10 h-10 rounded-full" alt="User" />
              <div>
                <h3 className="font-medium">Mohammad Khan</h3>
                <p className="text-xs text-green-600">● Online</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-center text-gray-500 text-sm">Start chatting!</p>
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex space-x-2">
              <input type="text" placeholder="Type a message..." className="input-field flex-1" />
              <button className="btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
