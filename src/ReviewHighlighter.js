import React, { useEffect } from 'react';

const sentimentColors = {
  Positive: '#D9F2DD',
  Negative: '#F2DBD9',
  Mixed: '#e8bd6d3d',
  Neutral: '#eaf09b6b',
};

const ReviewHighlighter = ({ review }) => {
  const { content, analytics } = review;

  const getHighlightedText = () => {
    let highlightedText = content;
    analytics.forEach(({ topic, sentiment, highlight_indices }) => {
      highlight_indices.forEach(([start, end]) => {
        const sentence = content.slice(start, end);
        const highlightedSentence = `<span class="highlight" style="background-color: ${sentimentColors[sentiment]};" data-topic="${topic}">${sentence}</span>`;
        highlightedText = highlightedText.replace(sentence, highlightedSentence);
      });
    });
    return { __html: highlightedText };
  };

  useEffect(() => {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(element => {
      element.addEventListener('mouseover', (e) => {
        const topic = e.target.getAttribute('data-topic');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerText = topic;
        document.body.appendChild(tooltip);

        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight}px`;
      });

      element.addEventListener('mouseout', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
          tooltip.remove();
        }
      });
    });
  }, [review]);

  return <p dangerouslySetInnerHTML={getHighlightedText()} />;
};

export default ReviewHighlighter;
