import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface ContentData {
  welcomeText: string;
  welcomeAudio: string;
  durationText: string;
  interactiveHeartText: string;
  interactiveHeartImage: string;
  couplePortrait: {
    man: string;
    woman: string;
  };
  galleryImages: string[];
}

interface ContentContextType {
  content: ContentData | null;
  updateContent: (newContent: ContentData) => void;
  saveContent: () => Promise<void>;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/content.json");
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const updateContent = useCallback((newContent: ContentData) => {
    setContent(newContent);
  }, []);

  const saveContent = useCallback(async () => {
    if (!content) return;
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });
      if (!response.ok) {
        throw new Error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content");
    }
  }, [content]);

  return (
    <ContentContext.Provider value={{ content, updateContent, saveContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
};
