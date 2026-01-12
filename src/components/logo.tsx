export default function Logo() {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e6" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <path
          d="M21.3333 7.99996C18.2306 5.83462 14.293 5.39526 10.8521 6.81804C7.41119 8.24083 4.86947 11.3482 4.04382 15.0218C3.21817 18.6955 4.21835 22.613 6.66666 25.3333"
          stroke="url(#logo-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M10.6667 24C13.7694 26.1653 17.707 26.6047 21.1479 25.1819C24.5888 23.7591 27.1305 20.6518 27.9562 16.9781C28.7818 13.3045 27.7817 9.38702 25.3333 6.66663"
          stroke="url(#logo-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  