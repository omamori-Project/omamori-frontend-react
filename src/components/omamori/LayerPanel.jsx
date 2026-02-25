export default function LayerPanel({ layers, selectedId, setSelectedId, moveLayerUp, moveLayerDown, changeFontSize}) {
    return (
        // 레이어 배열 복사해 재정렬 후 렌더링
        <div>
        {[...layers]
            .filter(layer => layer.type !== "frame")
            .sort((a, b) => b.zIndex - a.zIndex)
            .map(layer => (
            <div
                key={layer.tempId}
                onClick={() => setSelectedId(layer.tempId)}
            >
                {layer.type} (z:{layer.zIndex})

                <button onClick={(e) => { e.stopPropagation(); moveLayerUp(layer.tempId); }}>위</button>
                <button onClick={(e) => { e.stopPropagation(); moveLayerDown(layer.tempId); }}>아래</button>

                {/* 만일 텍스트인 경우, 글자 크기 수정 */}
                {layer.type === "text" && layer.tempId === selectedId && (
                <input
                    type="number"
                    value={layer.fontSize}
                    onChange={(e) =>
                    changeFontSize(layer.tempId, Number(e.target.value))
                    }
                />
                )}
            </div>
            ))}
        </div>
    );
}