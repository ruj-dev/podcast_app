import React from 'react'

function FileComponent({accept,id,onChange}) {
  return (
    <>
      
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
}

export default FileComponent