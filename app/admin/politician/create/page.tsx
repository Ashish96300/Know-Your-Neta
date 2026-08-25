"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CloudinaryUpload from "@/app/components/common/CloudinaryUpload";

interface ElectoralArea {
    _id: string;
    name: string;
    type: "State" | "LokSabha" | "VidhanSabha" | "MunicipalWard";
    number?: number;
    parentArea?: string;
}

interface Party {
    _id: string;
    name: string;
    abbreviation: string;
}

interface PoliticianFormData {
    name: string;
    photo: string;
    party: string;
    electoralArea: string;
    education: string;
    profession: string;
    politicalCareer: string;
    assets: number;
    liabilities: number;
    criminalCaseCount: number;
    achievements: string;
    status: "active" | "former";
    currentTermStartYear?: number;
    termStatus: "current" | "past";
}

export default function CreatePolitician() {
    const [form, setForm] = useState<PoliticianFormData>({
        name: "",
        photo: "",
        party: "",
        electoralArea: "",
        education: "",
        profession: "",
        politicalCareer: "",
        assets: 0,
        liabilities: 0,
        criminalCaseCount: 0,
        achievements: "",
        status: "active",
        currentTermStartYear: undefined,
        termStatus: "current",
    });

    const [areas, setAreas] = useState<ElectoralArea[]>([]);
    const [parties, setParties] = useState<Party[]>([]);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    const [selectedState, setSelectedState] = useState("");
    const [selectedLokSabha, setSelectedLokSabha] = useState("");
    const [selectedVidhanSabha, setSelectedVidhanSabha] = useState("");

    // -----------------------------
    // Load parties + electoral areas
    // -----------------------------
    useEffect(() => {
        async function loadData() {
            try {
                const [areasRes, partiesRes] = await Promise.all([
                    axios.get("/api/electoralArea"),
                    axios.get("/api/party"),
                ]);

                setAreas(areasRes.data.data);
                setParties(partiesRes.data.data);
            } catch (error) {
                console.error("Failed to load form data", error);
                alert("Failed to load parties or electoral areas");
            } finally {
                setDataLoading(false);
            }
        }

        loadData();
    }, []);

    // -----------------------------
    // Electoral hierarchy
    // -----------------------------
    console.log(areas);
    const states = areas.filter(
        (area) => area.type === "State"
    );

    const lokSabhas = areas.filter(
        (area) =>
            area.type === "LokSabha" &&
            area.parentArea?.toString() === selectedState
    );

    const vidhanSabhas = areas.filter(
        (area) =>
            area.type === "VidhanSabha" &&
            area.parentArea?.toString() === selectedLokSabha
    );

    const wards = areas.filter(
        (area) =>
            area.type === "MunicipalWard" &&
             area.parentArea?.toString() === selectedVidhanSabha
    );

    // -----------------------------
    // Generic form updater
    // -----------------------------

    function updateField<K extends keyof PoliticianFormData>(
        field: K,
        value: PoliticianFormData[K]
    ) {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    // -----------------------------
    // Hierarchy handlers
    // -----------------------------

    function handleStateChange(value: string) {
        setSelectedState(value);
        setSelectedLokSabha("");
        setSelectedVidhanSabha("");

        updateField("electoralArea", "");
    }

    function handleLokSabhaChange(value: string) {
        setSelectedLokSabha(value);
        setSelectedVidhanSabha("");

        updateField("electoralArea", "");
    }

    function handleVidhanSabhaChange(value: string) {
        setSelectedVidhanSabha(value);

        // If there are no wards, VidhanSabha itself
        // becomes the politician's electoral area.
        if (
            !areas.some(
                (area) =>
                    area.type === "MunicipalWard" &&
                    area.parentArea === value
            )
        ) {
            updateField("electoralArea", value);
        } else {
            updateField("electoralArea", "");
        }
    }

    function handleWardChange(value: string) {
        updateField("electoralArea", value);
    }

    // -----------------------------
    // Submit
    // -----------------------------

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Politician name is required");
            return;
        }

        if (!form.party) {
            alert("Please select a party");
            return;
        }

        if (!form.electoralArea) {
            alert(
                "Please select a Municipal Ward or Vidhan Sabha constituency"
            );
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                "/api/politician",
                form
            );

            console.log("Politician created:", res.data);

            alert("Politician created successfully");

            // Reset form
            setForm({
                name: "",
                photo: "",
                party: "",
                electoralArea: "",
                education: "",
                profession: "",
                politicalCareer: "",
                assets: 0,
                liabilities: 0,
                criminalCaseCount: 0,
                achievements: "",
                status: "active",
                currentTermStartYear: undefined,
                termStatus: "current",
            });

            setSelectedState("");
            setSelectedLokSabha("");
            setSelectedVidhanSabha("");
        } catch (error: unknown) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                console.log("Validation errors:", error.response?.data?.errors);
                alert(error.response?.data?.message || "Failed to create politician");
            }
        } finally {
            setLoading(false);
        }
    }

    if (dataLoading) {
        return (
            <div className="mx-auto w-full max-w-3xl">
                Loading form...
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-3xl space-y-8"
        >
            <FieldGroup>

                {/* BASIC INFORMATION */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">
                        Basic Information
                    </h2>

                    <Field>
                        <FieldLabel htmlFor="name">
                            Name
                        </FieldLabel>

                        <Input
                            id="name"
                            value={form.name}
                            onChange={(e) =>
                                updateField(
                                    "name",
                                    e.target.value
                                )
                            }
                            placeholder="Enter politician name"
                            required
                        />
                    </Field>

                    {/* CLOUDINARY PHOTO */}
                    <Field>
                        <FieldLabel>Politician Photo</FieldLabel>

                        <CloudinaryUpload
                            folder="politicians"
                            onUpload={(publicId) =>
                                updateField("photo", publicId)
                            }
                        />

                        {form.photo && (
                            <p className="text-sm text-muted-foreground">
                                Image uploaded successfully
                            </p>
                        )}
                    </Field>

                    {/* PARTY */}
                    <Field>
                        <FieldLabel>
                            Party
                        </FieldLabel>

                        <Select
                            value={form.party}
                            onValueChange={(value) => {
                                if (value) {
                                    updateField("party", value);
                                }
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select party" />
                            </SelectTrigger>

                            <SelectContent>
                                {parties.map((party) => (
                                    <SelectItem
                                        key={party._id}
                                        value={party._id}
                                    >
                                        {party.name} (
                                        {party.abbreviation})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                </div>

                {/* ELECTORAL AREA */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">
                        Electoral Area
                    </h2>

                    {/* STATE */}
                    <Field>
                        <FieldLabel>
                            State
                        </FieldLabel>

                        <Select
                            value={selectedState}
                            onValueChange={(value) => {
                            if (value) {
                                handleStateChange(value);
                            }
                        }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                            </SelectTrigger>

                            <SelectContent>
                                {states.map((area) => (
                                    <SelectItem
                                        key={area._id}
                                        value={area._id}
                                    >
                                        {area.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* LOK SABHA */}
                    <Field>
                        <FieldLabel>
                            Lok Sabha Constituency
                        </FieldLabel>

                        <Select
                            value={selectedLokSabha}
                            onValueChange={(value) => {
                                if (value) {
                                    handleLokSabhaChange(value);
                                }
                            }}
                        disabled={!selectedState}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Lok Sabha constituency" />
                            </SelectTrigger>

                            <SelectContent>
                                {lokSabhas.map((area) => (
                                    <SelectItem
                                        key={area._id}
                                        value={area._id}
                                    >
                                        {area.number
                                            ? `${area.number}. `
                                            : ""}
                                        {area.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* VIDHAN SABHA */}
                    <Field>
                        <FieldLabel>
                            Vidhan Sabha Constituency
                        </FieldLabel>

                        <Select
                            value={selectedVidhanSabha}
                            onValueChange={(value) => {
                                if (value) {
                                    handleVidhanSabhaChange(value);
                                }
                            }}
                            disabled={!selectedLokSabha}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Vidhan Sabha constituency" />
                            </SelectTrigger>

                            <SelectContent>
                                {vidhanSabhas.map((area) => (
                                    <SelectItem
                                        key={area._id}
                                        value={area._id}
                                    >
                                        {area.number
                                            ? `${area.number}. `
                                            : ""}
                                        {area.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* WARD */}
                    {selectedVidhanSabha &&
                        wards.length > 0 && (
                            <Field>
                                <FieldLabel>
                                    Municipal Ward
                                </FieldLabel>

                                <Select
                                    value={
                                        form.electoralArea
                                    }
                                    onValueChange={(value) => {
                                        if (value) {
                                            handleWardChange(value);
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select ward" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {wards.map(
                                            (area) => (
                                                <SelectItem
                                                    key={
                                                        area._id
                                                    }
                                                    value={
                                                        area._id
                                                    }
                                                >
                                                    {area.number
                                                        ? `${area.number}. `
                                                        : ""}
                                                    {
                                                        area.name
                                                    }
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}

                    {/* NO WARDS */}
                    {selectedVidhanSabha &&
                        wards.length === 0 && (
                            <FieldDescription>
                                No municipal wards exist for
                                this constituency. The
                                Vidhan Sabha constituency will
                                be used as the electoral area.
                            </FieldDescription>
                        )}

                    <FieldDescription>
                        State → Lok Sabha → Vidhan Sabha
                        → Municipal Ward
                    </FieldDescription>
                </div>

                {/* PROFESSIONAL INFORMATION */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">
                        Professional Information
                    </h2>

                    <Field>
                        <FieldLabel>
                            Education
                        </FieldLabel>

                        <Input
                            value={form.education}
                            onChange={(e) =>
                                updateField(
                                    "education",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <Field>
                        <FieldLabel>
                            Profession
                        </FieldLabel>

                        <Input
                            value={form.profession}
                            onChange={(e) =>
                                updateField(
                                    "profession",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <Field>
                        <FieldLabel>
                            Political Career
                        </FieldLabel>

                        <Input
                            value={
                                form.politicalCareer
                            }
                            onChange={(e) =>
                                updateField(
                                    "politicalCareer",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <Field>
                        <FieldLabel>
                            Achievements
                        </FieldLabel>

                        <Input
                            value={form.achievements}
                            onChange={(e) =>
                                updateField(
                                    "achievements",
                                    e.target.value
                                )
                            }
                        />
                    </Field>
                </div>

                {/* ADDITIONAL INFORMATION */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">
                        Additional Information
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field>
                            <FieldLabel>
                                Assets
                            </FieldLabel>

                            <Input
                                type="number"
                                min="0"
                                value={form.assets}
                                onChange={(e) =>
                                    updateField(
                                        "assets",
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                            />
                        </Field>

                        <Field>
                            <FieldLabel>
                                Liabilities
                            </FieldLabel>

                            <Input
                                type="number"
                                min="0"
                                value={form.liabilities}
                                onChange={(e) =>
                                    updateField(
                                        "liabilities",
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                            />
                        </Field>

                        <Field>
                            <FieldLabel>
                                Criminal Cases
                            </FieldLabel>

                            <Input
                                type="number"
                                min="0"
                                value={
                                    form.criminalCaseCount
                                }
                                onChange={(e) =>
                                    updateField(
                                        "criminalCaseCount",
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                            />
                        </Field>

                        <Field>
                            <FieldLabel>
                                Term Start Year
                            </FieldLabel>

                            <Input
                                type="number"
                                min="1900"
                                value={
                                    form.currentTermStartYear ??
                                    ""
                                }
                                onChange={(e) =>
                                    updateField(
                                        "currentTermStartYear",
                                        e.target.value
                                            ? Number(
                                                  e.target
                                                      .value
                                              )
                                            : undefined
                                    )
                                }
                            />
                        </Field>
                    </div>

                    {/* STATUS */}
                    <Field>
                        <FieldLabel>
                            Status
                        </FieldLabel>

                        <Select
                            value={form.status}
                           onValueChange={(value) => {
                            if (value === "active" || value === "former") {
                                updateField("status", value);
                            }
                        }}
                                                >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="active">
                                    Active
                                </SelectItem>

                                <SelectItem value="former">
                                    Former
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* TERM STATUS */}
                    <Field>
                        <FieldLabel>
                            Term Status
                        </FieldLabel>

                        <Select
                            value={form.termStatus}
                            onValueChange={(value) =>
                                updateField(
                                    "termStatus",
                                    value as
                                        | "current"
                                        | "past"
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="current">
                                    Current
                                </SelectItem>

                                <SelectItem value="past">
                                    Past
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading
                        ? "Creating..."
                        : "Create Politician"}
                </Button>
            </FieldGroup>
        </form>
    );
}