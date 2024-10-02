import React, { useEffect } from 'react'

const ExpertHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.document.title = "Home | NutriMitra";
  }, []);

  return (
    <div>
      Inside EXPERTHOME
    </div>
  )
}

export default ExpertHome
