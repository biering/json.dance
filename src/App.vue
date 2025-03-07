<template>
  <div class="flex min-h-screen justify-center">
    <div
      class="flex w-full max-w-screen-md flex-col items-center space-y-3 p-4 md:p-8"
    >
      <Header />
      <div class="w-full space-y-1.5 p-6">
        <h1
          class="glitch-title text-center text-2xl tracking-wide"
          data-text="json.dance"
        >
          json.dance
        </h1>
        <h2
          class="cyber-title text-center text-lg font-semibold tracking-wide text-[var(--neon-pink)]"
        >
          JSON/YAML Converter and Prettifier
        </h2>
      </div>
      <div class="w-full">
        <TextEditor v-model="content" @format="formatContent" />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import TextEditor from './components/TextEditor.vue'
</script>

<style>
.cyber-edge {
  position: relative;
}

.cyber-edge::before {
  position: absolute;
}

.cyber-edge-tl::before {
  content: '';
  top: 0;
  left: 0;
  width: 1rem;
  height: 1rem;
  border-left: 3px solid var(--neon-blue);
  border-top: 3px solid var(--neon-blue);
}

.cyber-edge-tr::before {
  content: '';
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  border-right: 3px solid var(--neon-blue);
  border-top: 3px solid var(--neon-blue);
}

.cyber-edge-bl::before {
  content: '';
  bottom: 0;
  left: 0;
  width: 1rem;
  height: 1rem;
  border-left: 3px solid var(--neon-blue);
  border-bottom: 3px solid var(--neon-blue);
}

.cyber-edge-br::before {
  content: '';
  bottom: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  border-right: 3px solid var(--neon-blue);
  border-bottom: 3px solid var(--neon-blue);
}

.cyber-title {
  text-shadow:
    0 0 10px rgba(0, 255, 255, 0.3),
    0 0 20px rgba(0, 255, 255, 0.2);
}

.glitch-title {
  font-weight: 800;
  color: var(--neon-pink);
  position: relative;
  text-shadow: 0.05em 0 0 var(--neon-blue);
  animation: glitch 0.9s infinite;
}

.glitch-title::before,
.glitch-title::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
}

.glitch-title::before {
  left: 2px;
  text-shadow: -2px 0 var(--neon-blue);
  animation:
    noise-1 0.5s infinite linear alternate-reverse,
    glitch-move 3s infinite;
  clip-path: inset(30% 0 25% 0);
}

.glitch-title::after {
  left: -2px;
  text-shadow: 2px 0 var(--neon-pink);
  animation:
    noise-2 0.3s infinite linear alternate-reverse,
    glitch-move 4s infinite reverse;
  clip-path: inset(45% 0 40% 0);
}

@keyframes glitch {
  0% {
    text-shadow:
      0.05em 0 0 var(--neon-blue),
      -0.05em -0.025em 0 var(--neon-pink);
  }
  15% {
    text-shadow:
      -0.05em -0.025em 0 var(--neon-blue),
      0.025em 0.025em 0 var(--neon-pink);
  }
  30% {
    text-shadow:
      0.025em 0.05em 0 var(--neon-blue),
      0.05em 0 0 var(--neon-pink);
  }
  45% {
    text-shadow:
      -0.025em 0 0 var(--neon-blue),
      -0.025em -0.025em 0 var(--neon-pink);
  }
  100% {
    text-shadow:
      0.05em 0 0 var(--neon-blue),
      -0.05em -0.025em 0 var(--neon-pink);
  }
}

@keyframes noise-1 {
  0%,
  20%,
  40%,
  60%,
  80% {
    opacity: 0;
    transform: translateX(-2px);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    opacity: 0.3;
    transform: translateX(2px);
  }
}

@keyframes noise-2 {
  0%,
  20%,
  40%,
  60%,
  80% {
    opacity: 0;
    transform: translateX(2px);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    opacity: 0.3;
    transform: translateX(-2px);
  }
}

@keyframes glitch-move {
  0% {
    clip-path: inset(30% 0 25% 0);
  }
  20% {
    clip-path: inset(45% 0 40% 0);
  }
  40% {
    clip-path: inset(60% 0 35% 0);
  }
  60% {
    clip-path: inset(25% 0 58% 0);
  }
  80% {
    clip-path: inset(42% 0 40% 0);
  }
  100% {
    clip-path: inset(30% 0 25% 0);
  }
}

@media (max-width: 640px) {
  .cyber-title {
    font-size: 1.8rem;
  }

  .glitch-title {
    font-size: 2.2rem;
  }
}
</style>
