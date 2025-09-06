// Utility function to fetch data from local JSON file
export async function fetchLocalData() {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch data from local JSON:", error);
    return null;
  }
}

// Helper functions for specific data types
export async function fetchProjects() {
  const data = await fetchLocalData();
  return data ? data.projects : [];
}

export async function fetchCertificates() {
  const data = await fetchLocalData();
  return data ? data.certificates : [];
}

export async function fetchComments() {
  const data = await fetchLocalData();
  return data ? data.portfolio_comments : [];
}

export async function fetchPinnedComment() {
  const data = await fetchLocalData();
  if (!data || !data.portfolio_comments) return null;
  
  return data.portfolio_comments.find(comment => comment.is_pinned === true) || null;
}

export async function fetchRegularComments() {
  const data = await fetchLocalData();
  if (!data || !data.portfolio_comments) return [];
  
  return data.portfolio_comments
    .filter(comment => comment.is_pinned === false)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

// Mock function for adding comments (since we're using static data now)
export async function addComment(commentData) {
  // In a real implementation, you might want to use localStorage
  // or implement a more sophisticated local storage solution
  console.log("Comment would be added:", commentData);
  
  // For now, just return success
  return { success: true, message: "Comment functionality disabled in local mode" };
}

// Mock function for image upload (since we're using static data now)
export async function uploadImage(imageFile) {
  // In a real implementation, you might want to convert to base64
  // and store in localStorage or use a different approach
  console.log("Image upload attempted:", imageFile.name);
  
  // Return a placeholder URL
  return `https://placehold.co/100x100/6366f1/FFFFFF?text=${imageFile.name.charAt(0).toUpperCase()}`;
}
