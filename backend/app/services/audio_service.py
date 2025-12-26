import librosa
import numpy as np
from typing import Dict


class AudioService:
    @staticmethod
    def extract_features(audio_path: str) -> Dict:
        """librosa ile ses dosyasından akustik özellikler çıkar"""
        y, sr = librosa.load(audio_path, sr=None)
        
        # Temel özellikler
        duration = librosa.get_duration(y=y, sr=sr)
        
        # Enerji (RMS)
        rms = librosa.feature.rms(y=y)[0]
        mean_energy = float(np.mean(rms))
        max_energy = float(np.max(rms))
        
        # Temel frekans (pitch)
        pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
        pitch_values = []
        for t in range(pitches.shape[1]):
            index = magnitudes[:, t].argmax()
            pitch = pitches[index, t]
            if pitch > 0:
                pitch_values.append(pitch)
        
        mean_pitch = float(np.mean(pitch_values)) if pitch_values else 0.0
        std_pitch = float(np.std(pitch_values)) if pitch_values else 0.0
        
        # MFCC (Mel-frequency cepstral coefficients)
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        mfcc_mean = [float(x) for x in np.mean(mfccs, axis=1)]
        mfcc_std = [float(x) for x in np.std(mfccs, axis=1)]
        
        # Spektral özellikler
        spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
        mean_spectral_centroid = float(np.mean(spectral_centroids))
        
        spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)[0]
        mean_spectral_rolloff = float(np.mean(spectral_rolloff))
        
        zero_crossing_rate = librosa.feature.zero_crossing_rate(y)[0]
        mean_zcr = float(np.mean(zero_crossing_rate))
        
        # Tempo (BPM)
        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
        tempo = float(tempo) if tempo else 0.0
        
        return {
            "duration": duration,
            "sample_rate": int(sr),
            "energy": {
                "mean": mean_energy,
                "max": max_energy
            },
            "pitch": {
                "mean": mean_pitch,
                "std": std_pitch
            },
            "mfcc": {
                "mean": mfcc_mean,
                "std": mfcc_std
            },
            "spectral": {
                "centroid": mean_spectral_centroid,
                "rolloff": mean_spectral_rolloff,
                "zero_crossing_rate": mean_zcr
            },
            "tempo": tempo
        }


audio_service = AudioService()

