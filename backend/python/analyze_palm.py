import sys
import cv2

def analyze_palm(image_path):
    image = cv2.imread(image_path, 0)  # grayscale
    blurred = cv2.GaussianBlur(image, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)

    contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Approximate number of palm lines (naively)
    line_count = len([cnt for cnt in contours if cv2.arcLength(cnt, True) > 100])

    # Basic logic (customize this more)
    features = []
    if line_count >= 8:
        features.append("Many palm lines")
    elif line_count >= 5:
        features.append("Average palm lines")
    else:
        features.append("Few palm lines")

    features.append(f"Total detected contours: {line_count}")

    return "\n".join(features)

if __name__ == "__main__":
    path = sys.argv[1]
    print(analyze_palm(path))
