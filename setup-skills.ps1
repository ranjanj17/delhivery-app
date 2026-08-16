$skills = @("building-native-ui", "frontend-design", "react-native-architecture", "react-native-animations", "nativewind", "shadcn-ui-react-native")
$files = @("SKILL.md", "DESIGN-SYSTEM-TEMPLATE.md", "MOTION-SPEC.md", "ACCESSIBILITY.md", "RESPONSIVE-DESIGN.md", "rules.csv", "rules.json")

foreach ($skill in $skills) {
    $dir = ".agents/skills/$skill"
    if (!(Test-Path -Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir
    }
    foreach ($file in $files) {
        $path = "$dir/$file"
        if (!(Test-Path -Path $path)) {
            if ($file -eq "SKILL.md") {
                Set-Content -Path $path -Value "--`nname: $skill`ndescription: $skill guidelines`n--`n# $skill Guidelines"
            } elseif ($file -eq "rules.json") {
                Set-Content -Path $path -Value "{}"
            } else {
                Set-Content -Path $path -Value "# $file for $skill"
            }
        }
    }
}
