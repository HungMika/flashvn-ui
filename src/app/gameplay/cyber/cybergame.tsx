'use client'

import { useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const UnityGame = () => {
  const { unityProvider, sendMessage, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/CyberFighter/CyberFighter.loader.js",
    dataUrl: "/CyberFighter/CyberFighter.data",
    frameworkUrl: "/CyberFighter/CyberFighter.framework.js",
    codeUrl: "/CyberFighter/CyberFighter.wasm",
  });
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cyber`;

  const handleUnityLoad = useCallback(() => {
    if (isLoaded) {
      sendMessage("DatabaseManager", "SetAPIUrl", apiUrl);
    }
  }, [isLoaded, sendMessage, apiUrl]); // Đảm bảo sendMessage cũng là một dependency

    useEffect(() => {
        handleUnityLoad();
    }, [handleUnityLoad]);
    return (
        <div className="flex flex-col items-center gap-10 justify-center min-h-screen w-screen bg-slate-900">
            <div className="min-h-10 min-w-full mt-15 font-bold text-5xl text-center" style={{color: "#5202ba"}}>
                CyberFighter: Intersafe
            </div>
            <div className="relative w-[1280px] h-[720px] bg-black shadow-xl overflow-hidden">                        
                {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold z-10">
                    Loading... {Math.round(loadingProgression * 100)}%
                </div>
                )}
                <Unity
                unityProvider={unityProvider}
                className={`
                    w-full h-full                        
                    ${isLoaded ? 'block' : 'hidden'}     
                `}
                />
            </div>
        </div>
    );
};

export default UnityGame;