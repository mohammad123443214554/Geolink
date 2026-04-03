export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">About Geolink</h1>
      
      <div className="space-y-6">
        {/* What is Geolink */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">🌟</span>
            What is Geolink?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Geolink is a revolutionary social media platform that combines the best features of 
            <strong> Facebook</strong>, <strong>YouTube</strong>, and <strong>Snapchat</strong>, 
            while giving you the opportunity to <strong>earn money</strong> from your content!
          </p>
        </div>
        
        {/* How to Earn */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">💰</span>
            How to Earn Money
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <span className="text-3xl">❤️</span>
              <div>
                <h3 className="font-bold text-lg">Likes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Earn 1 point for every like = <strong>₹0.01</strong>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <span className="text-3xl">👁️</span>
              <div>
                <h3 className="font-bold text-lg">Views</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Earn 1 point for every view = <strong>₹0.01</strong>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <span className="text-3xl">💬</span>
              <div>
                <h3 className="font-bold text-lg">Comments</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Earn 1 point for every comment = <strong>₹0.01</strong>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <span className="text-3xl">🔄</span>
              <div>
                <h3 className="font-bold text-lg">Shares</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Earn 1 point for every share = <strong>₹0.01</strong>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg border-2 border-green-200 dark:border-green-800">
              <span className="text-3xl">🎉</span>
              <div>
                <h3 className="font-bold text-lg text-green-700 dark:text-green-300">Subscriber Bonus</h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Get <strong>₹1000/month</strong> when you reach 1000 subscribers!
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              <strong>Note:</strong> 1000 points = ₹10
            </p>
          </div>
        </div>
        
        {/* Creator Info */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">👨‍💻</span>
            Creator
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              MK
            </div>
            <div>
              <p className="text-lg font-bold">Mohammad Khan</p>
              <p className="text-gray-600 dark:text-gray-400">Platform launched: January 2026</p>
            </div>
          </div>
        </div>
        
        {/* Legal Pages */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">📄</span>
            Legal Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a href="#" className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center space-x-2">
              <span>📋</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Terms & Conditions</span>
            </a>
            <a href="#" className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center space-x-2">
              <span>🔒</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Privacy Policy</span>
            </a>
            <a href="#" className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center space-x-2">
              <span>👥</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Community Guidelines</span>
            </a>
            <a href="#" className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center space-x-2">
              <span>©️</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Copyright Policy</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
