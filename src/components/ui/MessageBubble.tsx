import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

// Fix for default marker icon in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export interface MessageAttachment {
    type: 'image' | 'video' | 'file' | 'location';
    url?: string;
    name?: string;
    latitude?: number;
    longitude?: number;
}

export interface MessageBubbleProps {
  message?: string;
  time: string;
  isAgent?: boolean;
  showReadIcon?: boolean;
  className?: string;
  attachment?: MessageAttachment;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  time,
  isAgent = false,
  showReadIcon = false,
  className = '',
  attachment,
}) => {
  return (
    <div className={`max-w-[70%] rounded-xl text-sm leading-snug relative flex flex-col gap-1 overflow-hidden transition-all shadow-sm ${
      isAgent 
        ? 'self-end bg-[var(--brand-primary)] text-white rounded-br-none' 
        : 'self-start bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-bl-none border border-[var(--border-color)]'
    } ${className}`}>
      
      {attachment && (
        <div className="w-full">
            {attachment.type === 'image' && (
                <img src={attachment.url} alt={attachment.name || 'Image'} className="w-full h-auto object-cover rounded-t-lg max-h-60" />
            )}
            {attachment.type === 'video' && (
                <video src={attachment.url} controls className="w-full h-auto rounded-t-lg max-h-60" />
            )}
            {attachment.type === 'file' && (
                <div className="flex items-center gap-3 p-3 bg-black/5 rounded-lg m-1">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl text-[var(--text-primary)] shadow-sm">
                        <i className='bx bxs-file-doc'></i>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-semibold text-xs truncate max-w-[150px]">{attachment.name}</span>
                        <span className="text-[10px] opacity-70">Document</span>
                    </div>
                    <a href={attachment.url} download={attachment.name} className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors">
                        <i className='bx bx-download'></i>
                    </a>
                </div>
            )}
            {attachment.type === 'location' && (
                <div className="flex flex-col gap-2 p-2">
                    <div className="w-full h-32 rounded-lg relative overflow-hidden z-0">
                         {attachment.latitude && attachment.longitude ? (
                            <MapContainer 
                                center={[attachment.latitude, attachment.longitude]} 
                                zoom={15} 
                                scrollWheelZoom={false}
                                dragging={false}
                                zoomControl={false}
                                doubleClickZoom={false}
                                touchZoom={false}
                                attributionControl={false}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <TileLayer
                                    url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                                />
                                <Marker position={[attachment.latitude, attachment.longitude]} />
                            </MapContainer>
                         ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-500">Invalid Location</span>
                            </div>
                         )}
                    </div>
                    <div className="px-1 pb-1">
                        <div className="font-medium text-xs">Shared Location</div>
                        <div className="text-[10px] opacity-70">
                            {attachment.latitude?.toFixed(6)}, {attachment.longitude?.toFixed(6)}
                        </div>
                    </div>
                </div>
            )}
        </div>
      )}

      {message && <div className="px-3.5 pt-2 pb-1">{message}</div>}
      
      <div className={`text-[10px] px-3.5 pb-2 mt-0 flex items-center gap-1 justify-end ${isAgent ? 'text-white/70' : 'text-[var(--text-tertiary)]'}`}>
        {time}
        {isAgent && showReadIcon && <i className="bx bx-check-double text-base"></i>}
      </div>
    </div>
  );
};

export default MessageBubble;

