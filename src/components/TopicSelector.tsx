import React from "react";
import { Topic } from "@/types";

interface TopicSelectorProps {
  topics: Topic[];
  selectedTopicId: string;
  onTopicChange: (topicId: string) => void;
  disabled: boolean;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  topics,
  selectedTopicId,
  onTopicChange,
  disabled,
}) => {
  if (topics.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <label
        htmlFor="topic-select"
        className="text-sm font-medium text-slate-300"
      >
        Focus Topic:
      </label>
      <select
        id="topic-select"
        value={selectedTopicId}
        onChange={(e) => onTopicChange(e.target.value)}
        disabled={disabled}
        className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full sm:w-auto p-2.5 disabled:opacity-50"
      >
        <option value="none" disabled>
          -- Select a Topic --
        </option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TopicSelector;
