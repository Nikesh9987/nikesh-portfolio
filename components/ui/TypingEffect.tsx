"use client";
import { useState, useEffect } from "react";

interface TypingEffectProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export default function TypingEffect({
  words,
  speed = 80,
  deleteSpeed = 45,
  pauseTime = 2000,
  className = "",
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(t);
    }

    const currentWord = words[wordIndex];

    if (!isDeleting) {
      if (displayed.length < currentWord.length) {
        const t = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
        }, speed);
        return () => clearTimeout(t);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(t);
      } else {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }
  }, [displayed, isDeleting, isPaused, wordIndex, words, speed, deleteSpeed, pauseTime]);

  return (
    <span className={`typing-cursor ${className}`}>
      {displayed}
    </span>
  );
}