<template>
  <div>
    <header class="page-header">
      <div class="logo-container">
        <router-link :to="{ path: '/home' }">
          <img
            src="../../assets/img/logo_transparent.png"
            alt="Logo"
            class="logo"
          />
        </router-link>

        <span class="logo-text">云织非遗</span>
      </div>
      <router-link :to="{ path: '/userProfile/login' }">
        <button class="login-button">立即登录</button>
      </router-link>
    </header>
    <div class="chat-container">
      <!-- 左侧历史会话列表 -->
      <Sidebar @conversation-selected="handleConversationSelected" />

      <!-- 右侧聊天消息列表 -->
      <div class="message-list-container">
        <div
          class="message-list"
          :style="{ maxHeight: messageListHeight }"
          ref="messageList"
        >
          <div
            class="message"
            v-for="(message, index) in messages"
            :key="index"
          >
            <img
              :src="
                message.type === 'bot'
                  ? 'https://s21.ax1x.com/2024/03/11/pF6FAuF.png'
                  : 'https://s21.ax1x.com/2024/03/11/pF6FicT.png'
              "
              alt="Avatar"
              class="avatar"
            />
            <div v-if="message.type === 'user'" class="user-message">
              {{ message.text }}
            </div>
            <div v-else class="bot-message">{{ message.text.answer }}</div>
          </div>
        </div>

        <!-- 消息输入框 -->
        <div class="input-container">
          <!-- <div class="frame-group">
            <img src="./..\..\assets\img\枫香染.svg" alt="枫香染" />
          </div> -->
          <textarea
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Type your message..."
            rows="2"
          ></textarea>
          <button class="icon-button send-button absolute" @click="sendMessage">
            <!-- 替换成SVG图标 -->
            <svg
              class="icon-svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M7 11L12 6L17 11M12 18V7"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar.vue";
import axios from "axios";

export default {
  name: "ChatPage",
  data() {
    return {
      messages: [],
      newMessage: "",
      messageListHeight: "calc(100vh - 200px)", // 初始化为页面高度减去200像素的余量
    };
  },
  components: {
    Sidebar,
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        // 用户输入
        this.messages.push({
          type: "user",
          text: this.newMessage,
          // avatar: "../../assets/img/user.png",
        });
        // 在这里发送消息给机器人，并处理机器人的回复
        // 你可以调用后端接口或者其他方式来实现机器人对话的功能
        // 示例：假设机器人的回复是预先定义好的，可以直接添加到消息列表中
        axios
          .post("http://localhost:3000/api", {
            question: this.newMessage,
          })
          .then((response) => {
            const botReply = response.data; // 假设机器人回复存储在response.data中，需要根据实际情况调整
            this.messages.push({
              type: "bot",
              text: botReply,
              // avatar: "../../assets/img/bot.png",
            });
            // 清空输入框
            this.newMessage = "";
            // 滚动到消息列表底部
            this.$nextTick(() => {
              this.$refs.messageList.scrollTop =
                this.$refs.messageList.scrollHeight;
            });
          })
          .catch((error) => {
            console.error("Error fetching bot reply:", error);
            alert("Error fetching bot reply:", error);
          });
      }
    },
    handleConversationSelected(conversation) {
      // 假设`messages`是你用来在模板中展示消息的数组
      // 现在将其更新为选中会话的消息数组
      this.messages = conversation.messages;
    },
    updateMessageListHeight() {
      const headerHeight = 40; // 头部导航栏高度
      const windowHeight = window.innerHeight;
      this.messageListHeight = `${windowHeight - headerHeight - 200}px`; // 减去200像素的余量
    },
  },
  mounted() {
    this.updateMessageListHeight();
    window.addEventListener("resize", this.updateMessageListHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateMessageListHeight);
  },
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  /* background-color: #007bff; */
  color: black;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 100px; /* 根据实际情况调整 */
  margin-right: 10px;
}

.logo-text {
  font-family: "楷体", cursive;
  font-size: 20px;
}

.chat-container {
  display: flex;
  max-width: 100%;
  height: 90vh;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.message-list-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px; /* 左侧留出间距 */
}

.message-list {
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
}

.user-message {
  background-color: #e5f5fc;
  padding: 10px;
  border-radius: 5px;
}

.bot-message {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 调整输入框及按钮的位置 */
  margin-top: auto;
  position: relative; /* 设置相对定位 */
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* max-width: 800px; */
  width: 100%;
  box-sizing: border-box;
  cursor: text;
  position: relative;
  min-height: 52px;
}

.input-container textarea {
  border: none;
  outline: none;
  font-size: 16px;
  flex-grow: 1;
  margin-left: 12px;
  margin-right: 12px;
  resize: none;
  overflow-y: hidden;
  max-height: 200px;
  padding: 0.625rem 2.5rem;
  line-height: 1.5;
}

.send-button {
  background-color: #e6e6e6;
  padding: 2px;
  border-radius: 8px;
  cursor: default;
  right: 0.75rem;
}

.avatar {
  width: 40px; /* 头像的宽度 */
  height: 40px; /* 头像的高度 */
  border-radius: 50%; /* 圆形头像 */
  margin-right: 10px; /* 与消息文本之间的距离 */
  align-self: center; /* 使头像垂直居中 */
}

.message {
  display: flex;
  align-items: center; /* 确保消息和头像在同一行垂直居中 */
  margin-bottom: 10px;
}

.user-message,
.bot-message {
  flex: 1; /* 使消息文本填充剩余空间 */
  padding: 10px;
  border-radius: 5px;
}

.frame-group {
  position: absolute; /* 设置绝对定位 */
  top: -50px; /* 调整frame-group在input-container中的位置 */
}

.login-button {
  background: linear-gradient(289.65deg, #ba3822 0%, #e39167 100%);
  color: #fff;
  /* font-family: "楷体", cursive; */
  width: 84px;
  height: 30px;
}
</style>
