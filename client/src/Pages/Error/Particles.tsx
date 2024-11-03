
const Particles = () => {
    const particleCount = 30;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: particleCount }).map((_, index) => (
                <svg
                    key={index}
                    className="particle absolute"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                        top: `${Math.random() * 100}vh`,
                        left: `${Math.random() * 100}vw`,
                        opacity: Math.random() * 0.5 + 0.3,
                        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                >
                    <polygon
                        points="12,2 22,9 18,22 6,22 2,9"
                        fill="black"
                    />
                </svg>
            ))}
        </div>
    );
};

export default Particles;
