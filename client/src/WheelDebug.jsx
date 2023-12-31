const debug = false; //trueにしておけば、開発用のタイヤが映る

export const WheelDebug = ({ radius, wheelRef }) => {
  return (
    debug && (
      <group ref={wheelRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius, radius, 0.015, 16]} />
          <meshNormalMaterial transparent={true} opacity={0.3} />
        </mesh>
      </group>
    )
  );
};
//半透明の車輪の情報をデバッグで返す
