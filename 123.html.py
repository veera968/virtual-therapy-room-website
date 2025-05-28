<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Virtual Therapist Room</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <div class="chatbox">
      <div class="header">
        <h2>Virtual Therapist Room</h2>
      </div>
      <div class="messages" id="messages">
        <!-- Chat messages will appear here -->
      </div>
      <input type="text" id="user-input" placeholder="Type your message..." />
      <button onclick="sendMessage()">Send</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
