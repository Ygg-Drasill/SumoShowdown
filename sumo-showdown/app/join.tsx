import SumoTextInput from "@/components/sumoTextInput";
import { Link, Href } from "expo-router";
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { View, Platform, TextInput, Button, Text, Pressable, GestureResponderEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import c from "@/theme";
import useColorTheme from "@/hooks/useColors";
import axios from "axios"
import { useState } from "react";
import * as haptics from "expo-haptics"
import t from "@/theme";

export default function Join() {
    const c = useColorTheme()
    const [code, setCode] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const { data: token, isPending, mutate: joinSession } = useMutation({
        mutationKey: ["session"],
        mutationFn: async () => {
            const res = await axios.post(process.env.EXPO_PUBLIC_API_URL ?? "", { code: code, name: name })
            return res.data
        },
        onSuccess: () => {
            haptics.notificationAsync(haptics.NotificationFeedbackType.Success)
        },
        onError: () => {
            haptics.notificationAsync(haptics.NotificationFeedbackType.Error)
        }
    })

    const onJoinPressed = (e: GestureResponderEvent) => {
        joinSession()
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <TextInput
                cursorColor={t.c.primary}
                maxLength={1} style={{
                    color: c.text,
                    fontSize: 32,
                    height: t.s.d.lg,
                    borderBottomColor: t.c.primary,
                    borderBottomWidth: 2,
                    width: t.s.d["xl"]
                }}
                keyboardType="number-pad"
                onChangeText={(t) => setCode(parseInt(t))}
                placeholder="code" />
            <TextInput cursorColor={t.c.primary} maxLength={32} onChangeText={(t) => setName(t)} placeholder="name" />
            <Pressable style={{}} onPress={onJoinPressed}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Ionicons size={48} name="log-in-outline" />
                </View>
            </Pressable>
        </SafeAreaView>
    );
}