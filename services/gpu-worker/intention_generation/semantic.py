"""Strict prototype semantic transport; never accepts paths or raw free-form requests."""
import json


def validate_request(request):
    if not isinstance(request, dict) or set(request) - {'id', 'seed', 'prompt'}:
        raise ValueError('Intention request accepts only id, seed, prompt')
    if type(request.get('seed')) is not int or not 0 <= request['seed'] <= 2147483647:
        raise ValueError('seed must be a nonnegative signed 32-bit integer')
    if not isinstance(request.get('prompt'), str):
        raise ValueError('prompt must serialize the semantic envelope')
    intent = json.loads(request['prompt'])
    if not isinstance(intent, dict) or set(intent) != {'version', 'kind', 'concept', 'axes', 'representation'}:
        raise ValueError('Unexpected semantic envelope fields')
    if type(intent['version']) is not int or intent['version'] != 1 or intent['kind'] != 'intention-destination' or intent['representation'] != 'abstract-solid':
        raise ValueError('Unsupported semantic envelope version/kind/representation')
    for value, limit in [(intent['concept'], 600), (intent.get('axes', {}).get('mood') if isinstance(intent.get('axes'), dict) else None, 80)]:
        if not isinstance(value, str) or not value.strip() or len(value) > limit or any(ord(c) < 32 for c in value):
            raise ValueError('Concept/mood must be bounded nonempty text without control characters')
    axes = intent['axes']
    if set(axes) != {'scale', 'density', 'mood', 'openness'}:
        raise ValueError('Unexpected semantic axes')
    for key, choices in [('scale', ['intimate', 'human', 'vast']), ('density', ['sparse', 'balanced', 'dense']), ('openness', ['enclosed', 'mixed', 'open'])]:
        if axes[key] not in choices:
            raise ValueError('Unsupported ' + key)
    return intent


def image_prompt(intent):
    a = intent['axes']
    # Put axes first so long concepts cannot silently remove their conditioning.
    # Image metrics retain token counts and explicitly flag CLIP truncation.
    return (f"{a['scale']} scale, {a['density']} forms, {a['openness']} space, {a['mood']} atmosphere. "
            f"{intent['concept']}. Sculptural architectural diorama, three-quarter view, "
            "entire structure isolated on white background, no text.")
