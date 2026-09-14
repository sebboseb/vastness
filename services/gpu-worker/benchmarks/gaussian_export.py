"""Export the pinned TRELLIS Gaussian representation into the worker frame."""


def save_gaussian_ply(gaussian, path, transform):
    gaussian.save_ply(str(path), transform=transform)
