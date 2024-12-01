export default defineUnlistedScript(() => {
  (function () {
    // Get the current URL
    const url = window.location.href;

    // Check if the URL matches the pattern
    const regex = /^https:\/\/dev\.to\/([^\/]+)\/([^\/]+)$/;
    const matches = url.match(regex);

    if (matches) {
      const user = matches[1];
      const slug = matches[2];

      // Build the API URL for Dev.to article
      const apiUrl = `https://dev.to/api/articles/${user}/${slug}`;

      // Function to calculate AI percentage by posting to GPTZero API
      async function getAiPercentage(markdown) {
        try {
          const response = await fetch(
            "https://api.gptzero.me/v2/predict/text",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0",
              },
              body: JSON.stringify({
                document: markdown,
                source: "landing",
                writing_stats_required: true,
                sampleTextSubmitted: false,
                multilingual: true,
                interpretability_required: false,
                checkPlagiarism: false,
              }),
            },
          );

          // Ensure the response is ok
          if (!response.ok) {
            return -1; // Return -1 if the request fails
          }

          // Convert response to JSON
          const data = await response.json();

          // Extract 'completely_generated_prob' from the response and convert it to percentage
          const aiScore = data.documents[0].completely_generated_prob || -1;
          return aiScore >= 0 ? (aiScore * 100).toFixed(2) : -1;
        } catch (error) {
          return -1; // Return -1 if an error occurs
        }
      }

      // Fetch the article data from Dev.to
      fetch(apiUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject("Failed to fetch article data");
          }
        })
        .then((data) => {
          if (data && data.body_markdown) {
            // Call getAiPercentage with the markdown text
            getAiPercentage(data.body_markdown).then((aiPercentage) => {
              // Insert the button with the AI score
              const buttonHTML = `
              <button id="reaction-butt-ai_accuracy" aria-label="View ai accuracy" aria-pressed="false" class="crayons-reaction crayons-reaction--comment crayons-tooltip__activator relative" data-category="ai_accuracy">
                <span class="crayons-reaction__icon crayons-reaction__icon--borderless crayons-reaction__icon--inactive">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
                      <path d="M4 12c0-3.771 0-5.657 1.172-6.828S8.229 4 12 4s5.657 0 6.828 1.172S20 8.229 20 12s0 5.657-1.172 6.828S15.771 20 12 20s-5.657 0-6.828-1.172S4 15.771 4 12"/>
                      <path d="m7.5 15l1.842-5.526a.694.694 0 0 1 1.316 0L12.5 15m-4-2h3m4-4v6M8 2v2m8-2v2m-4-2v2M8 20v2m4-2v2m4-2v2m6-6h-2M4 8H2m2 8H2m2-4H2m20-4h-2m2 4h-2"/>
                    </g>
                  </svg>
                </span>
                <span class="crayons-reaction__icon crayons-reaction__icon--borderless crayons-reaction__icon--active">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
                      <path d="M4 12c0-3.771 0-5.657 1.172-6.828S8.229 4 12 4s5.657 0 6.828 1.172S20 8.229 20 12s0 5.657-1.172 6.828S15.771 20 12 20s-5.657 0-6.828-1.172S4 15.771 4 12"/>
                      <path d="m7.5 15l1.842-5.526a.694.694 0 0 1 1.316 0L12.5 15m-4-2h3m4-4v6M8 2v2m8-2v2m-4-2v2M8 20v2m4-2v2m4-2v2m6-6h-2M4 8H2m2 8H2m2-4H2m20-4h-2m2 4h-2"/>
                    </g>
                  </svg>
                </span>
                <span class="crayons-reaction__count" id="reaction-number-readinglist">${aiPercentage}%</span>
                <span data-testid="tooltip" class="crayons-tooltip__content">
                  This much percentage written by AI
                </span>
              </button>
            `;

              // Find the div with the class "crayons-article-actions__inner"
              const actionDiv = document.querySelector(
                ".crayons-article-actions__inner",
              );
              if (actionDiv) {
                // Get the first button inside the div
                const firstButton = actionDiv.querySelector("button");
                if (firstButton) {
                  // Insert the new button after the first button
                  firstButton.insertAdjacentHTML("afterend", buttonHTML);
                }
              }
            });
          }
        })
        .catch(() => {
          // Handle error if article fetch fails
        });
    }
  })();
});
