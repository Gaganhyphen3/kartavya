console.log('🚀 Starting Kartavya Backend...');
console.log('📁 Current directory:', process.cwd());
console.log('🔧 Node version:', process.version);

try {
  console.log('📦 Loading dependencies...');
  require('./server.js');
} catch (error) {
  console.error('❌ Error starting server:', error.message);
  console.error('Stack:', error.stack);
}