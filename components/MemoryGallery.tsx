import React, { memo } from 'react';
import DomeGallery from './DomeGallery';


const MemoryGallery = () => {
    return (
        <div className="w-full shrink-0 h-[600px]">
            <DomeGallery grayscale={false} />
        </div>
    );
};

export default memo(MemoryGallery);
